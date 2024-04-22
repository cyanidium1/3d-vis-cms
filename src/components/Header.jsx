import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import PersonIcon from "@mui/icons-material/Person";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ConfirmationModal from "./ConfirmationModal";
import Link from "@mui/material/Link";
import { fetchMenu, updateMenu, resetMenu } from "../redux/menuOperations";
import { useDispatch, useSelector } from "react-redux";
import { selectMenu } from "../redux/menuSlice";
import { Close } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Header({ setCheckedView }) {
  const dispatch = useDispatch();
  const menuData = useSelector(selectMenu);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    setCheckedView(event.target.checked);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, setModal] = useState("");
  const [variant, setVariant] = useState("");

  const openModal = (item) => {
    setVariant(item);
    switch (item) {
      case "set":
        setModal(
          "Вы уверены что хотите отправить на сайт текущее меню? Это удалит прежний вариант меню и загрузит текущий."
        );
        break;
      case "get":
        setModal(
          "Вы уверены что хотите скачать с сайта текущее меню? Это сбросит все введенные тут данные."
        );
        break;
      case "reset":
        setModal("Вы уверены что хотите сбросить меню к базовой версии?");
        break;
      default:
        console.log("smth went wrong");
        break;
    }
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    switch (variant) {
      case "set":
        dispatch(updateMenu(menuData));
        break;
      case "get":
        dispatch(fetchMenu());

        break;
      case "reset":
        dispatch(resetMenu());
        break;
      default:
        console.log("smth went wrong");
        break;
    }
    setIsModalOpen(false);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Меню
        </Typography>
        <Switch
          label="Switch demo"
          color="warning"
          checked={checked}
          onChange={handleChange}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Вид
        </Typography>
        <Button onClick={() => openModal("get")} color="inherit">
          <Typography className="text-green-100 flex items-center">
            <ContentPasteIcon />
            Получить
          </Typography>
        </Button>
        <Button onClick={() => openModal("set")} color="inherit">
          <Typography className="text-yellow-100 flex items-center">
            <ContentPasteGoIcon />
            Отправить
          </Typography>
        </Button>
        <Button onClick={() => openModal("reset")} color="inherit">
          <Typography className="text-red-100 flex items-center">
            <DriveFileMoveIcon />
            Восстановить
          </Typography>
        </Button>

        <Button color="inherit" onClick={handleOpen}>
          <Typography className="flex items-center">
            <QuestionMarkIcon />
            Как работает
          </Typography>
        </Button>
        <Link
          href="https://t.me/FreelancerOnMondays"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Button color="inherit">
            <Typography className="flex items-center">
              {" "}
              <PersonIcon />
              Написать разрабу
            </Typography>
          </Button>
        </Link>
        <ConfirmationModal
          handleSubmit={handleSubmit}
          modal={modal}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        // onConfirm={handleConfirm}
        />

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <IconButton
              sx={{ position: "absolute", top: 0, right: 0 }}
              onClick={handleClose}
            >
              <Close />
            </IconButton>
            <div class="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 10rem)' }}>
              <div class="bg-blue-500 text-white p-4">
                Верхняя голубая панель
              </div>
              <div>
                <ul>
                  <li><b>Получить</b> - делает запрос на сервер, забирает оттуда меню и отображает на ваш экран.</li>
                  <li><b>Восстановить</b> - позволяет извлечь резервную копию меню вшитую в код. Резервную копию можно поменять с помощью разработчика. Использовать только в случае крайней необходимости (например если случайно удалили вообще все меню и случайно отправили на сервер).</li>
                  <li><b>Как работает</b> - вы сейчас тут.</li>
                  <li><b>Отправить</b> - отправляет на сервер меню которое у вас на экране в таком виде как его видите вы.</li>
                  <li><b>Написать разработчику</b> - перекинет вас в диалог со мной.</li>
                </ul>
                <div class="bg-orange-500 text-white p-4">
                  Меню
                </div>
                <div>
                  <ul>
                    <li><b>Удалить</b> - удаляет элемент с вашего экрана. Пока вы не отправите меню на сервер изменения не будут видны на клиенте (клиент - пользовательская версия вашего сайта, то что видит покупатель).</li>
                    <li><b>Редактировать</b> - редактирует элемент.</li>
                    <li><b>Добавить</b> - добавляет элемент. Идентичен редактированию, отличается необходимостью добавить секцию для блюда.</li>
                  </ul>
                </div>
                <div class="bg-green-500 text-white p-4">
                  Опции модального окна
                </div>
                <div>
                  <p>Добавление или редактирование блюд - имеет одинаковый функционал, отличается тем что в добавлении нужно указать секцию.</p>
                  <p>Название - любой текст, небольшой.</p>
                  <p>Описание - можно до 5 предложений.</p>
                  <p>Цена и цена по скидке - целочисленные значения. Если поле "Цена по скидке" заполнено то элемент автоматически выведется в верхнюю панель на Клиенте а к цене будут применены стили.</p>
                  <p>Порция - строка до 8 символов.</p>
                  <p>Загрузить фото - нажимаем на кнопку, выбираем на компе, нажимаем загрузить - готово. Альтернативный вариант - вставить ссылку вручную (не рекомендуется).</p>
                </div>
              </div>
            </div>


            {/* <img
              src="https://images.unian.net/photos/2022_09/thumb_files/1200_0_1662892107-3846.jpg"
              alt="Инструкция"
              width={700}
            /> */}
          </Box>
        </Modal>
      </Toolbar>
    </AppBar>
  );
}
