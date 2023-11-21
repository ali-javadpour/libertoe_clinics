import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { ChevronLeftIcon, SmallAddIcon } from "@chakra-ui/icons";
import { UserContext } from "../../../context/provider";
import { useContext, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useToast
} from "@chakra-ui/react";
import { netCall } from "../../../lib/netcall";

const OrdersBox = () => {
  const { allOrders, setAllOrders, selectedOrder, setSelectedOrder, setProductsForOrders } = useContext(UserContext);

  const [orderValue, setOrderValue] = useState("")
  const [close, setClose] = useState(false)

  const toast = useToast()

  const showToast = (title, status) =>{
    // const statuses = ['success', 'error', 'warning', 'info']
    toast({
        title: title,
        status: status,
        duration: 5000,
        isClosable: true,
        position: "top",
      })
  }

  const orderClickHandler = async (data) => {
    setSelectedOrder(data);
    console.log(data.id);
    const products = await netCall(`order_product/order/${data.id}`, "get")
    if(products.status === 200){
      setProductsForOrders(products.data)
    }else{
      showToast("مشکی در ارتباط با سرور به وجود آمده", "error")
    }
  };

  const submitNewOrder = async () => {
      if(orderValue === ""){
          showToast("لطفا یک مقدار وارد کنید", "warning")
      }else{
          console.log(orderValue);
          const bodyData = {name: orderValue}
          const responce = await netCall("order", "post", bodyData)
          console.log(responce);
          if(responce.status === 201){
            showToast("سفارش با موفقیت ثبت شد","success")
            setAllOrders(e => [...e, responce.data])
            onClose()
        }else{
              showToast("مشکلی در ثبت سفارش به وجود آمده","error")
          }
          setOrderValue("")
      }
  }

  const handleNewOrder = (e) =>{
    setOrderValue(e.target.value)
  }
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className=" duration-500 ease-in-out right-0 w-5/12 h-full flex flex-col items-center gap-3 border-l-2">
        <h1 onClick={()=> setClose(!close) } className=" text-2xl ">سفارشات</h1>
        {/* <div className="w-full flex flex-row-reverse justify-around text-xs ">
          <p>نام سفارش</p>
          <p>وضعیت</p>
        </div> */}
        {allOrders.map((item, index) => {
          return (
            <Card
              className="w-[90%] duration-500 ease-in-out cursor-pointer"
              onClick={() => orderClickHandler(item)}
              marginRight={selectedOrder.id === item.id ? "30px" : 0}
              backgroundColor={selectedOrder.id === item.id ? "#ededed" : "white"}
              textAlign="right"
              key={item.id}
            >
              <CardBody
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <div className="flex flex-row items-center gap-5">
                  <ChevronLeftIcon boxSize={6} />
                  <p
                    className=" text-xs p-1 bg-zinc-200 rounded-full text-white "
                    style={
                      item.status === "تایید شده"
                        ? { backgroundColor: "#017067" }
                        : { backgroundColor: "#d09912" }
                    }
                  >
                    {item.status}
                  </p>
                </div>
                <div className=" flex flex-row items-center gap-2 ">
                  <Text>{item.name}</Text>
                  <p className=" text-sm "> .{index + 1}</p>
                </div>
              </CardBody>
            </Card>
          );
        })}
        <Card onClick={onOpen} width="90%" cursor="pointer">
          <CardBody display="flex" justifyContent="center" alignItems="center">
            <Text>
              <SmallAddIcon boxSize={10} />
            </Text>
          </CardBody>
        </Card>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader fontFamily="vazir">سفارش جدید</ModalHeader>
          <ModalBody>
            <div className=" w-full flex flex-col items-end font-[vazir] gap-3 ">
              <p>:نام سفارش</p>
              <Input
                placeholder='سفارش ۲۷ مهر' 
                className=" border border-black rounded w-full h-8 text-right "
                type="text"
                value={orderValue}
                onChange={handleNewOrder}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={submitNewOrder}
              className=" flex items-end w-full font-[vazir] "
            >
              تایید
            </Button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OrdersBox;
