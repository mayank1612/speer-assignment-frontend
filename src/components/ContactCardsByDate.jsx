import { Tooltip } from "@mui/material";
import ContactCard from "./ContactCard";

const ContactCardsByDate = ({ date, callLogs }) => {
  return (
    callLogs.length > 0 && (
      <div key={date}>
        <div id="date-seperator" className="flex justify-center my-2">
          <div className="border-dotted border-2 border-gray-500 my-3 w-full"></div>
          <div className="mx-3 text-nowrap text-sm text-gray-500 font-semibold">
            {date}
          </div>
          <div className="border-dotted border-2 border-gray-400 my-3 w-full"></div>
        </div>

        {callLogs.map((callData) => {
          return (
            <Tooltip key={callData.id} title="Click to more details">
              <div key={callData.id} className="my-2" id="contact-card">
                <ContactCard callData={callData} />
              </div>
            </Tooltip>
          );
        })}
      </div>
    )
  );
};

export default ContactCardsByDate;
