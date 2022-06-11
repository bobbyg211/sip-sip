import React, { useState } from "react";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function Music() {
  const [open, setOpen] = useState(false);

  const handleExpand = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <div className={`music ${open ? "open" : ""}`}>
      <iframe
        className="player"
        src="https://open.spotify.com/embed/playlist/0FO9ScXahULwovyxLDDiPQ?utm_source=generator&muted=1"
        width="100%"
        height="80"
        frameBorder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      ></iframe>
      <IconButton onClick={handleExpand} className="expand" aria-label="expand">
        {open ? <ArrowBackIos /> : <ArrowForwardIos />}
      </IconButton>
    </div>
  );
}
