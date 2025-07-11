export const CalendarSharingInstructions = () => {
  return (
    <div className="pb-4">
      <a
        href="/images/calendar-sharing-instructions-icloud.png"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700 transition-colors mr-4"
      >
        iCloud instructions
      </a>
      <a
        href="/images/calendar-sharing-instructions-outlook.png"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700 transition-colors"
      >
        Outlook instructions
      </a>
    </div>
  );
};
