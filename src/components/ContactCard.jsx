import CallReceivedIcon from "@mui/icons-material/CallReceived";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { formatTime } from "../utils/formatTime";
import { useNavigate } from "react-router-dom";
import { Chip } from "@mui/material";
import { callTypeColorMapper } from "../assets/constants";

const ContactCard = ({ callData }) => {
  const { from, to, direction, created_at, id, call_type } = callData;
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(`/details/${id}`, { replace: false });
  };

  return (
    <div
      className="bg-white flex shadow-lg rounded-lg p-3 gap-3 cursor-pointer"
      onClick={handleRedirect}
    >
      <div>
        {direction === "outbound" ? (
          <CallMadeIcon sx={{ width: "20px" }} />
        ) : (
          <CallReceivedIcon sx={{ width: "20px" }} />
        )}
      </div>
      <div>{direction === "outbound" ? to : from ?? "N.A"}</div>
      <div>
        <Chip
          label={call_type ?? "answered"}
          size="small"
          color={callTypeColorMapper[call_type]}
        />
      </div>
      <div className="flex items-center justify-end font-semibold ml-auto w-[4.5rem] border-dotted border-l-2 border-gray-600 text-sm">
        {formatTime(created_at)}
      </div>
    </div>
  );
};

export default ContactCard;
