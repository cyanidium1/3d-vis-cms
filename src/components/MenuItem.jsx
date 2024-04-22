import React from "react";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import {
  Button,
  Box,
  CardActions,
  DialogActions,
  DialogContent,
  Dialog,
} from "@mui/material";
import { Modal } from "@mui/material";
import { removeItem } from "../redux/menuSlice";
import FormUpdateItem from "./FormUpdateItem";
import imgFallback from "../images/fallback.jpg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function MenuItem({ item, section }) {
  const [openPopup, setOpenPopup] = React.useState(false);

  const handleClickOpenPopup = () => {
    setOpenPopup(true);
  };
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  const onRemoveItem = () => {
    dispatch(removeItem({ id: item.id, section }));
    handleClosePopup();
  };
  const isPromo = !!item.promoPrice;

  const priceTextDecoration = isPromo ? "line-through" : "none";
  const priceTextColor = isPromo ? "#ff0000" : "#252525";

  return (
    <Card
      sx={{
        marginBottom: 0,
        flexBasis: "204px",
      }}
    >
      <Box
        sx={{
          minHeight: "100%",
          display: "flex",

          "@media (min-width:768px)": {
            flexDirection: "column",
          },
        }}
      >
        <CardMedia
          component="img"
          height="100"
          image={item.photo || imgFallback}
          alt={item.name}
          sx={{
            width: "112px",
            borderRadius: "8px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            margin: "8px 0 8px 8px",

            "@media (max-width:767px)": {
              minWidth: "112px",
              maxWidth: "112px",
            },
            "@media (min-width:768px)": {
              margin: "16px 16px 0",
              width: "auto",
            },
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            fontSize: "10px",

            padding: "8px",
            "@media(min-width:768px)": {
              fontSize: "18px",
            },
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              color: "#762507",
              fontSize: " 18px",
              fontWeight: 600,
            }}
          >
            {item.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              flexGrow: 1,
              color: "#252525",
              marginBottom: 1,
              fontSize: "10px",
              "@media(min-width:600px)": {
                fontSize: "14px",
              },
            }}
          >
            {item.description}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", gap: "4px" }}>
              <Typography
                variant="body1"
                sx={{
                  color: "#252525",
                  fontWeight: 700,
                  textDecoration: priceTextDecoration,
                  "@media(max-width:767px)": {
                    fontSize: "12px",
                  },
                }}
              >
                {item.price}
              </Typography>
              {isPromo && (
                <Typography
                  variant="body1"
                  sx={{
                    color: "#ff0000",
                    fontWeight: 700,
                    "@media(max-width:767px)": {
                      fontSize: "12px",
                    },
                  }}
                >
                  {item.promoPrice}
                </Typography>
              )}
              <Typography
                variant="body1"
                sx={{
                  color: priceTextColor,
                  fontWeight: 700,
                  "@media(max-width:767px)": {
                    fontSize: "12px",
                  },
                }}
              >
                лек
              </Typography>
            </Box>

            <Typography
              variant="body1"
              sx={{
                color: "#252525",
                fontWeight: 700,
                "@media(max-width:767px)": {
                  fontSize: "12px",
                },
              }}
            >
              {item.portionSize}
            </Typography>
          </Box>
        </CardContent>
        <CardActions className="flex flex-col">
          <Button color="error" onClick={handleClickOpenPopup}>
            Удалить
          </Button>
          <Button onClick={handleOpen}>Редактировать</Button>
        </CardActions>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormUpdateItem item={item} section={section} onClose={handleClose} />
        </Box>
      </Modal>

      <Dialog
        onClose={handleClosePopup}
        aria-labelledby="customized-dialog-title"
        open={openPopup}
      >
        <DialogContent dividers>
          <Typography gutterBottom>Вы точно желаете удалить товар?</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="error" autoFocus onClick={handleClosePopup}>
            Нет
          </Button>
          <Button onClick={onRemoveItem}>Да</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default MenuItem;
