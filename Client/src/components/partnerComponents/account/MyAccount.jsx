import React, { useEffect, useState } from "react";
import { images } from "../../../assets/images.js";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Post from "./Post.jsx"
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
import "./MyAccount.css";
const MyAccount = () => {
  const [alert, setAlert] = useState({ message: "", status: "" });
  const [post, setPost] = useState({ image: null, caption: "" });
  const [account, setAccount] = useState({});

  const fetchMyInfo = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER}/partner/accountInfo`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await res.json();
    if (response.success) {
      setAccount(response.data);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", post.image);
    formData.append("caption", post.caption);
    const res = await fetch(`${import.meta.env.VITE_SERVER}/partner/post`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    const response = await res.json();

    if (response.success) {
      setPost({ image: null, caption: "" });
      setAlert({ message: response.message, status: "success" });
      handleClose();
    } else {
      setAlert({ message: response.message, status: "error" });
    }
  };
  useEffect(() => {
    fetchMyInfo();
  }, [account]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const close = () => {
    setAlert({ message: "", status: "" });
  };

  return (
    <div className="h-screen flex p-0.5">
      <Snackbar
        open={alert.message}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={close}
        className="w-1/2 mx-auto my-4"
      >
        <Alert variant="filled" severity={alert.status}>
          {alert.message}
        </Alert>
      </Snackbar>
      <div className=" w-full h-1/3 cursor-pointer  ">
        <img
          src={images.chef2}
          alt="Chef"
          className="hover:opacity-90 duration-700 banner rounded-[12px] w-full h-full"
        />
        <div className=" avatar h-full w-full flex items-center">
          <img
            src={images.chef2}
            alt="Chef Avatar"
            className="h-44 w-44 rounded-full border-4 border-white hover:scale-105 duration-700"
          />
          <div className="ml-4 h-full flex flex-col py-2 justify-center font-semibold text-sm">
            <p className="capitalize text-4xl font-bold">{account.name}</p>
            <p className="capitalize">@ {account.type}</p>
            <p className="text-blue-700">
              <MailOutlineIcon sx={{ fontSize: "1rem", color: "black" }} />{" "}
              {account.email}
            </p>
            <p className="text-blue-700">
              <LocalPhoneIcon sx={{ fontSize: "1rem", color: "black" }} />{" "}
              {account.contact}
            </p>
            <p className="capitalize">
              {" "}
              <HomeOutlinedIcon sx={{ fontSize: "1.2rem" }} />
              {account.address}, {account.state}, {account.pincode}
            </p>
          </div>
          <div>
            <button
              className="bg-black py-1 w-40 rounded-full text-white hover:scale-105 duration-700"
              onClick={handleOpen}
            >
              Add Post
            </button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <input
                  type="file"
                  name="image"
                  onChange={(e) =>
                    setPost({ ...post, image: e.target.files[0] })
                  }
                ></input>
                <input
                  type="text"
                  name="caption"
                  placeholder="Enter caption"
                  value={post.caption}
                  onChange={(e) =>
                    setPost({ ...post, caption: e.target.value })
                  }
                ></input>
                <button
                  onClick={handlePost}
                  className="bg-black py-1 w-40 rounded-full text-white hover:scale-105 duration-700"
                >
                  Submit
                </button>
              </Box>
            </Modal>
          </div>
        </div>
      </div>

      <Post/>
    </div>
  );
};

export default MyAccount;
