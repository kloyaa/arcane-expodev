export interface INotificationPayload {
    collapseKey: string;
    data: Record<string, any>; // You can specify a more detailed type for the 'data' field if needed
    from: string;
    messageId: string;
    notification: NotificationContent;
    originalPriority: number;
    priority: number;
    sentTime: number;
    ttl: number;
}

interface NotificationContent {
    android: AndroidNotification; // Contains Android-specific notification details
    body: string;
    title: string;
}

interface AndroidNotification {
    imageUrl: string; // URL for the image to be displayed in the notification
}
