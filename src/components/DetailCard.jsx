import CallReceivedIcon from "@mui/icons-material/CallReceived";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { Chip } from "@mui/material";
import { callTypeColorMapper } from "../assets/constants";
import { formatDate } from "../utils/formateDate";
import { formatTime } from "../utils/formatTime";
import { formatDuration } from "../utils/formatDuration";

const DetailCard = ({ callDetails }) => {
  const {
    call_type,
    created_at,
    duration,
    direction,
    from,
    to,
    via,
    outbound,
    is_archived,
  } = callDetails;

  return (
    <div
      id="detail-card"
      className=" bg-white my-5 mx-2 flex shadow-lg rounded-lg p-3 flex-col"
    >
      <section id="first-row" className="flex gap-3">
        {/* If direction is missing in data then by default call in incoming */}
        {direction === "outbound" ? (
          <CallMadeIcon sx={{ width: "20px" }} />
        ) : (
          <CallReceivedIcon sx={{ width: "20px" }} />
        )}
        <div className="">{direction === "outbound" ? to : from ?? "N.A"}</div>
        <div>
          <Chip
            label={call_type}
            size="small"
            color={callTypeColorMapper[call_type]}
          />
        </div>
      </section>
      <section id="second-row" className="flex gap-3 mt-2">
        <div>{formatDate(created_at)}</div>
        <div>{formatTime(created_at)}</div>
      </section>
      <section id="third-row" className="flex gap-3">
        <div>Duration: {formatDuration(duration)}</div>
      </section>
      <section id="forth-row" className="flex gap-3">
        <div>Via: {via ?? "N.A"}</div>
      </section>
    </div>
  );
};

export default DetailCard;
