import * as React from "react";
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { makeSelectLocale } from 'module/LanguageProvider/selectors';
import { localeChange } from 'module/LanguageProvider/actions';

interface ILocalChange {
  locale: 'en' | 'ru';
  onLocaleChange(val: string): void;
};

type LangProviderType = React.FunctionComponent<ILocalChange>;

const LocalChange: LangProviderType = ({ locale = 'en', onLocaleChange}: ILocalChange) => {
  const handleClick = () => {
    const loc = locale === 'en' ? 'ru' : 'en';
    onLocaleChange(loc);
  };

  return <button onClick={handleClick}>{locale === 'en' ? 'Russian' : 'English'} </button>;
};

const mapStateToProps = createSelector(
  makeSelectLocale(),
  locale => ({ locale })
);

function mapDispatchToProps(dispatch: any) {
  return {
    onLocaleChange: (val: string) => dispatch(localeChange(val)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocalChange);