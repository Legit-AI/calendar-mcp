export const CalendarSharingInstructions = () => {
  return (
    <div className="text-sm pb-4 leading-none">
      <a
        href="/images/calendar-sharing-instructions-icloud.png"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700 transition-colors mr-4"
      >
        Apple Calendar instructions
      </a>
      <br className="sm:hidden" />
      <br className="sm:hidden" />
      <a
        href="/images/calendar-sharing-instructions-outlook.png"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700 transition-colors"
      >
        Outlook Calendar instructions
      </a>
    </div>
  );
};
