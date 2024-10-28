import toast from "react-hot-toast";

const notifications = (type, msg) => {
  switch (type) {
    case "CREATE":
      toast.success("محصول با موفقیت اضافه شد");
      break;
    case "UPDATE":
      toast.success("محصول با موفقیت ویرایش شد");
      break;
    case "DELETE":
      toast.success("محصول با موفقیت حذف شد");
      break;
    case "ERROR":
      toast.error(`مشکلی پیش آمد، لطفا مجددا تلاش کنید \n \n message: ${msg.message} - ${msg.response.statusText} / code: ${msg.code} `, {
        duration: 5000,
      });
      break;
    default:
      toast[type](msg);
  }
};

export default notifications;
