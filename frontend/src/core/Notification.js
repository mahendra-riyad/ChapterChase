import React, { forwardRef, useImperativeHandle } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const Notification = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    createNotification(type, title='', message= '', timeout=3000) {
        switch (type) {
          case "info":
            return NotificationManager.info(message, title, timeout);
          case "success":
            return NotificationManager.success(message, title, timeout);
          case "warning":
            return NotificationManager.warning(message, title, timeout);
          case "error":
            return NotificationManager.error(message, title, timeout);
    
          default:
            break;
        }
      }
  }));

  return (
    <div>
      <NotificationContainer />
    </div>
  );
});

export default Notification;
