import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { acknowledgeRecommendation } from 'routes/Dashboard/modules/Dashboard';
import classes from '../PopUpCard.scss';

const timeFormat = 'MMM Do';

const formatTime = time => moment(time).format(timeFormat);

const demoData = {
   "demoGuid":"9999",
   "event":{
      "office_cd":"KSGX",
      "lon":-102.68,
      "cntry_cd":"US",
      "msg_type":"Update",
      "onset_dt_tm_tz_abbrv":null,
      "phenomena":"HT",
      "disclaimer":null,
      "key":"cf63821f-9521-3f27-92ec-e1562ccd469b",
      "issue_dt_tm_local":"2016-06-27T04:38:50-07:00",
      "radiusInKm":700,
      "proc_dt_tm_tz_abbrv":"EST",
      "flood":null,
      "severity_cd":3,
      "certainty":"Likely",
      "lat":40.8,
      "expire_dt_tm_tz_abbrv":"EST",
      "etn":"0003",
      "detail_key":"cf63821f-9521-3f27-92ec-e1562ccd469b",
      "st_name":"Nebraska",
      "categories":[
         {
            "category":"Met",
            "category_cd":2
         }
      ],
      "msg_type_cd":2,
      "office_name":"Nebraska",
      "area_id":"CAZ048",
      "proc_dt_tm_local":"2016-06-27T04:38:58-07:00",
      "certainty_cd":2,
      "class":"bulletin",
      "area_type":"Z",
      "expire_dt_tm_local":"2016-06-29T20:00:00-07:00",
      "severity":"Moderate",
      "identifier":"e234b6f889bf9a91c5d9f309db63eaa0",
      "office_cntry_cd":"US",
      "effective_dt_tm_tz_abbrv":null,
      "cntry_name":"UNITED STATES OF AMERICA",
      "effective_dt_tm_local":null,
      "issue_dt_tm_tz_abbrv":"EST",
      "onset_dt_tm_local":null,
      "pil":"NPW",
      "source":"National Weather Service",
      "expire_time_gmt":1467255600,
      "urgency_cd":2,
      "st_cd":"NE",
      "event_desc":"Snow Storm",
      "response_types":[
         {
            "response_type_cd":4,
            "response_type":"Execute"
         }
      ],
      "urgency":"Expected",
      "area_name":"Lincoln Area",
      "significance":"Y",
      "office_st_cd":"NE",
      "headline_text":"Heavy snow fall thru next week"
   },
   "recommendations":[
      {
         "estimatedTimeOfArrival":"2016-10-16T00:00:00.000Z",
         "fromId":1,
         "status":"NEW",
         "toId":4,
         "_id":"c356b409cf40c0b45d27b26f309bde91"
      },
      {
         "estimatedTimeOfArrival":"2016-10-16T00:00:00.000Z",
         "fromId":4,
         "status":"NEW",
         "toId":4,
         "_id":"c356b409cf40c0b45d27b26f309be14f"
      }
   ]
};
export const StormCard = (props) => {
  const {
    event,
    recommendations,
  } = demoData;

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
