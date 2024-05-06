const styles = {
  abTestPage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    m: 0,
    p: 0,
    minHeight: "100vh",
    backgroundColor: "#121212",
    color: "#ffffff",
  },
  abtestContainer: {
    width: "100%",
    mt: "10vh",
    minWidth: "60vw",
    minHeight: "60vh",
    padding: "20px",
    backgroundColor: "#333333",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
  },
  testHeading: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
    color: "#81D4FA",
  },
  progressBar: {
    width: "100%",
    height: "10px",
    borderRadius: "5px",
    backgroundColor: "#555555",
  },
  gridItem: {
    width: "100%",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
  },
  imageCard: {
    width: "100%",
    maxHeight: "50vh",
    overflow: "hidden",
    borderRadius: "5px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease-in-out",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  imageDisplay: {
    maxWidth: "100%",
    maxHeight: "100%",
    height: "auto",
    width: "auto",
    objectFit: "contain",
  },
  actionButtons: {
    display: "flex",
    justifyContent: "center",
    padding: "10px 0",
  },
  iconButton: {
    color: "#8aca8c",
    backgroundColor: "#388e3c",
    "&:hover": {
      backgroundColor: "#245e27",
      color: "#5ebd61",
    },
  },
};

export default styles;
