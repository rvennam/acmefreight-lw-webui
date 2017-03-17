import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getWeatherObservations, selectMarker} from 'routes/Dashboard/modules/Dashboard';
import LoadingSpinner from 'components/LoadingSpinner';
import RaisedButton from 'material-ui/RaisedButton';
import classes from '../PopUpCard.scss';

const timeFormat = 'MMM Do, h:mm a';

const style = {
  marginLeft: 30,
  marginBottom: 0,
};

const formatTime = time => moment(time).format(timeFormat);

export class ShipmentCard extends React.PureComponent {

  componentWillMount = () => {
    this.getWeatherForecast();
  }

  componentDidUpdate = () => {
    this.getWeatherForecast();
  }

  getWeatherForecast = () => {
    if (this.props.shipment.currentLocation && !this.props.shipment.currentLocation.weather) {
      this.props.retrieveWeatherObservations(
        'shipment',
        this.props.shipment.id,
        this.props.shipment.currentLocation.longitude,
        this.props.shipment.currentLocation.latitude);
    }
  }

  changeStatusToInTransit = () => {
    this.props.shipment.status = "TRANSIT_ANIMATION";
    this.props.selectMarker('hidden', {});
    this.forceUpdate();
  }

  render() {
    console.log(this.props.shipment);
    let {
      status,
      currentLocation,
      estimatedTimeOfArrival,
      // updatedAt,
      fromId,
      toId,
      averageSpeed,
      shipmentHumidity,
      shipmentTemp,
    } = this.props.shipment;

    averageSpeed = averageSpeed || 42;
    shipmentHumidity = averageSpeed || 28;
    shipmentTemp = averageSpeed || 32;

    return (
      <div className={classes.contentContainer}>
        <div className={classes.subtitle2}>
          Status
        </div>
        <div>{status}&nbsp;{(status === 'DELIVERED') ?
          <i className="fa fa-check" aria-hidden="true" /> : ''}
          {status === 'NEW' &&
          <RaisedButton
            label="Schedule"
            primary={false}
            style={style}
            onClick={this.changeStatusToInTransit}
          />
        }
        </div>

        {currentLocation &&
          <div>
            <div className={classes.subtitle2}>
              Current Location
            </div>
            <div>{`
              ${currentLocation.city},
              ${currentLocation.state}
            `}</div>
          </div>
          }

        { status !== 'DELIVERED' &&
          <div>
            <div className={classes.subtitle2}>
              Estimated Time of Arrival
            </div>
            <div>{formatTime(estimatedTimeOfArrival)}</div>
          </div>
        }

        <div className={classes.subtitle2}>
          Shipment Data
        </div>
        <div><i className={`fa fa-car ${classes.icon}`} aria-hidden="true"></i>{averageSpeed && `Average Speed: ${averageSpeed}mph`}</div>
        <div><i className={`fa fa-snowflake-o ${classes.icon}`} aria-hidden="true"></i>{shipmentHumidity && `Humidity: ${shipmentHumidity}%`}</div>
        <div><i className={`fa fa-thermometer ${classes.icon}`} aria-hidden="true"></i>{shipmentTemp && `Temperature: ${shipmentTemp}°F`}</div>

        <div className={classes.subtitle2}>
          Origin
        </div>
        <div>{this.props.idToNameResolver.resolve('distributionCenter', fromId)}</div>

        <div className={classes.subtitle2}>
          Destination
        </div>
        <div>{this.props.idToNameResolver.resolve('retailer', toId)}</div>

        {currentLocation &&
          <div>
            <div className={classes.subtitle2}>
              Current Weather
            </div>
            <div>
              {currentLocation.weather ?
               `${currentLocation.weather.observation.temp}° | ${currentLocation.weather.observation.wx_phrase}` :
               (<div style={{ textAlign: 'center' }}><LoadingSpinner size={60} /></div>)}
            </div>
          </div>
        }
      </div>
    );
  }
}

ShipmentCard.propTypes = {
  selectMarker: React.PropTypes.func.isRequired,
  shipment: React.PropTypes.object.isRequired,
  retrieveWeatherObservations: React.PropTypes.func.isRequired,
  idToNameResolver: React.PropTypes.object,
};

const mapActionCreators = {
  retrieveWeatherObservations: getWeatherObservations,
  selectMarker,
};


export default connect(null, mapActionCreators)(ShipmentCard);
