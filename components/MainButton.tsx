import Image from "next/image";
import Button from "@mui/material/Button";

const MainButton = () => {
  return (
    <Button
      variant="contained"
      size="large"
      style={{
        backgroundColor: "#04C2C2",
        textTransform: "uppercase",
        minWidth: "240px",
        width: "100%",
        padding: "14px 0",
        color: "#262626",
      }}
    >
      <Image
        src="/buttonIcon.svg"
        alt="buttonIcon"
        width={24}
        height={24}
        style={{ marginRight: "8px" }}
      />
      каталог товарів
    </Button>
  );
};

export default MainButton;
