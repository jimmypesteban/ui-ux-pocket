import * as Notifications from 'expo-notifications';

const DAILY_REMINDER_ID = 'ui-ux-pocket:daily-reminder';
const DEFAULT_REMINDER_HOUR = 9;

const REMINDER_LINES = [
  'One button. One verdict. No appeals.',
  "Your instincts are about to be tested.",
  "Today's call won't wait for you to feel ready.",
  'Trust your eye. Or don’t. We’ll tell you which.',
  'Somewhere, a UI is wrong. Go judge it.',
  'You have opinions about spacing. Prove it.',
];

function todaysLine(): string {
  const dayNumber = Math.floor(Date.now() / 86400000);
  return REMINDER_LINES[dayNumber % REMINDER_LINES.length];
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function ensureDailyReminderScheduled(hour: number = DEFAULT_REMINDER_HOUR): Promise<void> {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let status = existingStatus;
    if (status !== 'granted') {
      const { status: requested } = await Notifications.requestPermissionsAsync();
      status = requested;
    }
    if (status !== 'granted') return;

    await Notifications.cancelScheduledNotificationAsync(DAILY_REMINDER_ID);
    await Notifications.scheduleNotificationAsync({
      identifier: DAILY_REMINDER_ID,
      content: {
        title: "TODAY'S JUDGMENT CALL",
        body: todaysLine(),
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        hour,
        minute: 0,
        repeats: true,
      },
    });
  } catch {
    // Notifications are a nice-to-have; never let scheduling failures block navigation.
  }
}

export async function cancelDailyReminder(): Promise<void> {
  try {
    await Notifications.cancelScheduledNotificationAsync(DAILY_REMINDER_ID);
  } catch {
    // Same as above — safe to ignore.
  }
}
