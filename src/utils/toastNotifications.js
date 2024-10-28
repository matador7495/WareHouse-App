import toast from "react-hot-toast";

const notifications = (type, obj_error) => {
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
      toast.error(
        `مشکلی پیش آمد، لطفا مجددا تلاش کنید \n \n message: ${obj_error.message} - ${obj_error.response.statusText} / code: ${obj_error.code} `,
        { duration: 5000 }
      );
      break;
    default:
      toast.error("مشکلی پیش آمد، لطفا مجددا تلاش کنید");
  }
};

export default notifications;
