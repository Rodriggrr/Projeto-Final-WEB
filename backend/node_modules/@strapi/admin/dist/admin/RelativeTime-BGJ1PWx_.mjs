import { jsx } from 'react/jsx-runtime';
import * as React from 'react';
import { intervalToDuration, isPast } from 'date-fns';
import { useIntl } from 'react-intl';

const intervals = ["years", "months", "days", "hours", "minutes", "seconds"];
const RelativeTime = React.forwardRef(
  ({ timestamp, customIntervals = [], ...restProps }, forwardedRef) => {
    const { formatRelativeTime, formatDate, formatTime } = useIntl();
    const interval = intervalToDuration({
      start: timestamp,
      end: Date.now()
      // see https://github.com/date-fns/date-fns/issues/2891 – No idea why it's all partial it returns it every time.
    });
    const unit = intervals.find((intervalUnit) => {
      return interval[intervalUnit] > 0 && Object.keys(interval).includes(intervalUnit);
    });
    const relativeTime = isPast(timestamp) ? -interval[unit] : interval[unit];
    const customInterval = customIntervals.find(
      (custom) => interval[custom.unit] < custom.threshold
    );
    const displayText = customInterval ? customInterval.text : formatRelativeTime(relativeTime, unit, { numeric: "auto" });
    return /* @__PURE__ */ jsx(
      "time",
      {
        ref: forwardedRef,
        dateTime: timestamp.toISOString(),
        role: "time",
        title: `${formatDate(timestamp)} ${formatTime(timestamp)}`,
        ...restProps,
        children: displayText
      }
    );
  }
);

export { RelativeTime as R };
//# sourceMappingURL=RelativeTime-BGJ1PWx_.mjs.map
