import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { acknowledgeRecommendation } from 'routes/Dashboard/modules/Dashboard';
import classes from '../PopUpCard.scss';

const timeFormat = 'MMM Do, h:mm a';

const formatTime = time => moment(time).format(timeFormat);

export const StormCard = (props) => {
  const {
    event,
    recommendations,
  } = props.storm;

  function handleRecommendation(id, approve) {
    console.log('acknowledging shipment ', id);
    props.acknowledgeRecommendation(id);
  }

  return (
    <div className={classes.contentContainer}>
      <div className={classes.iconTitleContainer}>
        <div>
          <img className={classes.weatherIcon} role="presentation" src="../storm.png" />
        </div>
        <div>
          <div>
            <h2>{event.event_desc}</h2>
          </div>

          <span className={classes.subtitle}>
        Severity:&nbsp;

          {event.severity}
          </span>
        </div>
      </div>


      <div className={classes.subtitle2}>
        Suggested Shipments
        <hr />
      </div>
      <div className={classes.shipmentRecommendationList}>

          Potential shipment disruptions due to weather.
          Consider these alternative shipments and routes.

        {recommendations.map((recommendation, index) =>
          <div className={classes.shipmentDialog} key={recommendation._id}>
            <div className={classes.shipmentTitle}>
              <i className={`fa fa-exclamation-triangle ${classes.icon}`} aria-hidden="true"></i>Shipment from {props.idToNameResolver.resolve('distributionCenter', recommendation.fromId)} to {props.idToNameResolver.resolve('retailer', recommendation.toId)}
              <div>New ETA: {formatTime(new Date().getTime() + 4 * 24 * 60 * 60 * 1000)}</div>
            </div>
            <div className={classes.shipmentDialogActionContainer}>
              <div
                id={`reject-${index}`}
                className={classes.shipmentDialogActionReject}
                onClick={() => handleRecommendation(recommendation._id, false)}
              >
                Reject
              </div>
              <div
                id={`approve-${index}`}
                className={classes.shipmentDialogActionApprove}
                onClick={() => handleRecommendation(recommendation._id, true)}
              >
                Approve
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={classes.warningMessage}>
        <i className={`fa fa-exclamation-triangle ${classes.icon}`} aria-hidden="true"></i>Warning: Delayed Shipments. Consider adding additional trucks.
      </div>
    </div>
  );
};

StormCard.propTypes = {
  storm: React.PropTypes.object.isRequired,
  idToNameResolver: React.PropTypes.object,
};

const mapActionCreators = {
  acknowledgeRecommendation,
};

export default connect(() => ({}), mapActionCreators)(StormCard);
