import 'styles/core.scss';
import { connect } from 'react-redux';
import { logout } from 'modules/demos';
import React from 'react';
import Header from './Header/Header';
import LogisticsWizard from './LogisticsWizard/LogisticsWizard';
import IconSection from './IconSection/IconSection';
import ArchDiagram from './ArchDiagram/ArchDiagram';
import Footer from './Footer/Footer';
import classes from './LandingPage.scss';

export const LandingPage = (props) => (
  <div className={classes.landingPage}>
    {props.logout() && ''}
    <Header />
    <LogisticsWizard />
    <IconSection />
    <ArchDiagram />
    <Footer />
  </div>
);

LandingPage.propTypes = {
  logout: React.PropTypes.func.isRequired,
};

const mapActionCreators = {
  logout,
};

const mapStateToProps = () => ({
});

// export default GlobalNav;
export default connect(mapStateToProps, mapActionCreators)(LandingPage);
