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
import OrdersBox from "./orders";
import ProductsBox from "./products";
  
  const Orders = () => {

    const { allOrders, setAllOrders, selectedOrder, setSelectedOrder } =useContext(UserContext);
  
    return (
      <div className=" w-full h-full flex flex-row ">
        {selectedOrder ? <ProductsBox/> : <div className=" w-7/12 h-full" />}
        <OrdersBox/>
      </div>
    );
  };
  
  export default Orders;
  