import CallReceivedIcon from "@mui/icons-material/CallReceived";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { formatTime } from "../utils/formatTime";

const ContactCard = ({ callData }) => {
  const { from, direction, created_at } = callData;
  return (
    <div className="bg-white flex shadow-lg rounded-lg p-3 gap-3">
      <div>
        {direction === "outbound" ? (
          <CallMadeIcon sx={{ width: "20px" }} />
        ) : (
          <CallReceivedIcon sx={{ width: "20px" }} />
        )}
      </div>
      <div>{from ?? "N.A"}</div>
      <div className="flex items-center font-semibold ml-auto pl-2 border-dotted border-l-2 border-gray-600 text-sm">
        {formatTime(created_at)}
      </div>
    </div>
  );
};

export default ContactCard;
