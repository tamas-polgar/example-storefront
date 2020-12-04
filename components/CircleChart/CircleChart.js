import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: 200,
    height: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "Column",
  },
  label: {
    fontSize: 16,
    marginBottom: theme.spacing(2),
  },
}));

const lightenColor = (color, percent) => {
  let num = parseInt(color.replace("#", ""), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    B = ((num >> 8) & 0x00ff) + amt,
    G = (num & 0x0000ff) + amt;

  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
      (G < 255 ? (G < 1 ? 0 : G) : 255)
    )
      .toString(16)
      .slice(1)
  );
};

const CircleChart = ({ label, value, color }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <label className={classes.label}>{label}</label>
      <CircularProgressbar
        value={value}
        text={`${value * 100}%`}
        minValue={0}
        maxValue={1}
        background
        styles={buildStyles({
          pathColor: color,
          textColor: lightenColor(color, -40),
          trailColor: "transparent",
          backgroundColor: lightenColor(color, 30),
        })}
      />
    </div>
  );
};

export default CircleChart;
