import { useMemo } from 'react';
import { ReactComponent as PhotoIcon } from '../../img/stub_icon.svg';
import NoDataIcon from '../../img/no_data.png';
import NoMapImage from '../../img/no_map_violations_icon.png';
import classes from './NoDataMessage.module.css';

export const NoDataTypes = {
  MAIN: 'main',
  MESSAGE: 'message',
  MAP_VIOLATIONS: 'mapViolations'
};

export const NoDataMessage = ({
  text,
  containerClassName = '',
  textBlock,
  icon,
  type = NoDataTypes.MESSAGE,
  isError
}) => {
  const data = useMemo(() => {
    const res = { icon: '', text: '', boxClassName: '' };
    if (type === NoDataTypes.MAIN) {
      res.icon = (
        <img src={NoDataIcon} alt="No Data" className={classes.noDataImage} />
      );
      res.text = (
        <>
          {text ? (
            <p className={classes.noDataText}>{text}</p>
          ) : (
            <>
              <p className={classes.noDataImageText}>
                No data available for this brand.
              </p>
              <p className={classes.noDataImageText}>
                Contact support for further assistance.
              </p>
            </>
          )}
        </>
      );
      res.boxClassName = classes.noDataBox;
    }
    if (type === NoDataTypes.MESSAGE) {
      res.icon = (
        <PhotoIcon
          className={`${classes.noDataIcon} ${
            isError ? classes.noDataErrorIcon : ''
          }`}
        />
      );
      res.text = (
        <p
          className={`${classes.noDataText} ${
            isError ? classes.noDataErrorText : ''
          }`}
        >
          {text
            ? text
            : isError
            ? 'An unexpected error occurred. Try to reload.'
            : 'No data found'}
        </p>
      );
    }

    if (type === NoDataTypes.MAP_VIOLATIONS) {
      res.icon = (
        <img
          src={NoMapImage}
          alt="No MAP Data"
          className={classes.noDataImage}
        />
      );
      res.text = <p className={classes.noDataText}>{text}</p>;
    }
    return res;
  }, [text, isError, type]);

  return (
    <div className={containerClassName}>
      <div className={`${classes.noData} ${data.boxClassName}`}>
        {icon ? icon : data.icon}
        {textBlock ? textBlock : data.text}
      </div>
    </div>
  );
};
