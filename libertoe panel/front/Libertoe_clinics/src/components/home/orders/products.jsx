import { Button, IconButton } from "@chakra-ui/button";
import { Card, CardBody } from "@chakra-ui/card";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  DeleteIcon,
  EditIcon,
  QuestionOutlineIcon,
  SmallAddIcon,
} from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/number-input";
import { useToast } from "@chakra-ui/toast";
import { Tooltip } from "@chakra-ui/tooltip";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/provider";
import { getAllOrders } from "../../../lib/initialProps";
import { netCall } from "../../../lib/netcall";

const ProductsBox = () => {
  const {
    allProducts,
    allOrders,
    setAllOrders,
    selectedOrder,
    setSelectedOrder,
    productsForOrders,
    setProductsForOrders,
  } = useContext(UserContext);
  const date = new Date(selectedOrder.created_date);
  const realdata = date.toLocaleDateString("fa-IR");

  const [productValues, setProductValues] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [count, setCount] = useState(1);
  const [size, setSize] = useState(30);
  const [limitted, setLimitted] = useState(false);

  useEffect(() => {
    if (selectedOrder.status !== "در حال تکمیل") {
      setLimitted(true);
    } else {
      setLimitted(false);
    }
  }, [selectedOrder]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const showToast = (title, status) => {
    // const statuses = ['success', 'error', 'warning', 'info']
    toast({
      title: title,
      status: status,
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  const closeModal = () => {
    setProductValues();
    setSearchValue("");
    setShowOptions(false);
    setCount(1);
    setSize(30);
    onClose();
  };

  const searchHandler = (e) => {
    const val = e.target.value;
    setSearchValue(val);
    if (val.length > 2) {
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  };

  const handleProductClick = (item) => {
    setSearchValue("");
    setShowOptions(false);
    setProductValues(item);
  };

  const submitNewProduct = async () => {
    const sendingData = {
      name: productValues.name,
      count: count,
      orderId: selectedOrder.id,
      productId: productValues.id,
      img: productValues.images[0].src,
      sku: productValues.sku,
      size: size,
    };
    console.log(sendingData);
    if (count) {
      const res = await netCall("order_product", "post", sendingData);
      console.log(res);
      if (res.status === 201) {
        showToast("محصول با موفقیت اضافه شد", "success");
        setProductsForOrders((e) => [...e, res.data]);
        closeModal();
      } else {
        showToast("در ثبت محصول مشکلی به وجود آمده", "error");
      }
    }
  };

  const handleSubmit = async () => {
    if (productsForOrders.length > 0) {
      if (
        window.confirm(
          "آیا از ثبت سفارش اطمینان دارید؟ در صورت ثبت سفارش امکان ویرایش وجود نخواهد داشت"
        )
      ) {
        console.log("confirmed");
        const data = {
          name: selectedOrder.name,
          status: "در انتظار تایید",
        };
        const res = await netCall(`order/${selectedOrder.id}`, "patch", data);
        if (res.status === 200) {
          showToast("سفارش با موفقیت ثبت شد", "success");
          const data = await getAllOrders();
          console.log(data);
          if (data.status === 200) {
            setAllOrders(data.data);
          }
        }
      } else {
        console.log("rejected");
      }
    } else {
      showToast("برای ثبت سفارش حداقل یک محصول اضافه کنید", "warning");
    }
  };

  const deleteOrder = async () => {
    if (
      window.confirm(
        "آیا از پاک کردن سفارش اطمینان دارید؟ این عمل غیر قابل برگشت است."
      )
    ) {
      const res = await netCall(`order/${selectedOrder.id}`, "delete");
      if (res.status === 200) {
        setSelectedOrder(0);
        showToast("سفارش با موفقیت حذف شد", "success");
        const data = await getAllOrders();
        console.log(data);
        if (data.status === 200) {
          setAllOrders(data.data);
        }
      } else {
        showToast("در حذف سفارش مشکلی به وجود آمد", "error");
      }
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("آیا از پاک کردن محصول اطمینان دارید؟")) {
      const res = await netCall(`order_product/${id}`, "delete");
      if (res.status === 200) {
        showToast("محصول با موفقیت حذف شد", "success");
        const products = await netCall(
          `order_product/order/${selectedOrder.id}`,
          "get"
        );
        if (products.status === 200) {
          setProductsForOrders(products.data);
        } else {
          showToast("مشکی در ارتباط با سرور به وجود آمده", "error");
        }
      } else {
        showToast("در حذف محصول مشکلی به وجود آمده", "error");
      }
    }
  };

  function priceGroup(value) {
    return value.match(/\d{1,3}(?=(\d{3})*$)/g).join(",");
  }

  return (
    <>
      <div className=" w-7/12 h-full flex flex-col items-center gap-3 font-[vazir] ">
        <h1 className=" text-2xl ">جزئیات سفارش</h1>
        <div className=" w-[95%] h-1/5 flex flex-col gap-5 text-sm ">
          <div className=" w-full flex flex-row-reverse justify-between items-center ">
            <div className=" flex flex-row-reverse gap-3 w-[40%] items-center ">
              <p>:نام</p>
              <p>{selectedOrder.name}</p>
              <IconButton
                variant="outline"
                size="xs"
                aria-label="deleting order"
                isDisabled={limitted}
                icon={<EditIcon />}
              />
            </div>
            <p className="w-[40%]">وضعیت: {selectedOrder.status}</p>
            <IconButton
              onClick={deleteOrder}
              isDisabled={limitted}
              variant="outline"
              colorScheme="red"
              size="sm"
              aria-label="deleting order"
              icon={<DeleteIcon />}
            />
          </div>
          <div className=" w-full flex flex-row-reverse justify-evenly ">
            <p>تاریخ ثبت: {realdata}</p>
            {/* <p>تاریخ آخرین ویرایش: -</p> */}
          </div>
        </div>
        <div className="flex flex-row w-[95%] justify-between items-center ">
          <Button
            onClick={handleSubmit}
            colorScheme="teal"
            size="md"
            width="40%"
            isDisabled={limitted}
          >
            تایید و ثبت سفارش
          </Button>
          <h1 className=" text-right text-lg ">:محصولات</h1>
        </div>
        <div className=" mt-3 w-[95%] h-4/5 overflow-y-scroll ">
          <div className="flex flex-col gap-3 h-full ">
            {!limitted && (
              <Card
                onClick={onOpen}
                width="100%"
                height="40px"
                cursor="pointer"
                marginTop="10px"
              >
                <CardBody
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  padding="۵px"
                >
                  <Text>
                    <SmallAddIcon boxSize={10} />
                  </Text>
                </CardBody>
              </Card>
            )}
            {productsForOrders.map((item, index) => {
              return (
                <>
                  <Card
                    // onClick={onOpen}
                    width="100%"
                    height="80px"
                    cursor="pointer"
                  >
                    <CardBody
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <div className="w-full flex flex-row-reverse justify-between items-center text-sm ">
                        <div className="flex flex-row-reverse items-center gap-2">
                          <img className="h-12 rounded-md " src={item.img} />
                        </div>
                        <p> {item.name}</p>
                        <div className="flex flex-row-reverse items-center gap-2">
                          <p>:تعداد</p>
                          {item.count}
                        </div>
                        <div className="flex flex-row-reverse items-center gap-2">
                          <p>:سایز</p>
                          {item.size}
                        </div>
                        <div className="flex flex-row-reverse items-center gap-2">
                          <p>:وضعیت</p>
                          {item.status}
                        </div>
                        <IconButton
                          variant="ghost"
                          colorScheme="red"
                          aria-label="Search database"
                          size="xs"
                          isDisabled={limitted}
                          onClick={() => deleteProduct(item.id)}
                          icon={<DeleteIcon />}
                        />
                      </div>
                    </CardBody>
                  </Card>
                </>
              );
            })}
          </div>
        </div>
        <Modal isOpen={isOpen} onClose={() => closeModal()} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader fontFamily="vazir">افزودن محصول</ModalHeader>
            <ModalBody>
              <div className=" w-full flex flex-col items-end font-[vazir] gap-3 h-24 ">
                <div className="flex flex-row-reverse gap-2">
                  <p>:انتخاب محصول</p>
                  <Tooltip
                    label="مشاهده مدل ها و جزئیات محصولات"
                    fontFamily="vazir"
                  >
                    <a href="https://libertoe.ir/#all_models" target="_blank">
                      <IconButton
                        size="xs"
                        aria-label="deleting order"
                        icon={<QuestionOutlineIcon />}
                      />
                    </a>
                  </Tooltip>
                </div>
                <Input
                  placeholder="فیبولا مشکی"
                  className=" border border-black rounded w-full h-8 text-right "
                  type="text"
                  value={searchValue}
                  onChange={searchHandler}
                />
              </div>
              {productValues ? (
                <div className="w-full flex flex-col h-20 gap-3 font-[vazir] ">
                  <div className="w-full flex flex-row-reverse justify-between items-center ">
                    <div className="flex flex-row-reverse items-center gap-2">
                      <p>:عکس</p>
                      <img
                        className="h-12 rounded-md "
                        src={productValues.images[0].src}
                      />
                    </div>
                    <p>نام: {productValues.name}</p>
                    <div className="flex flex-row-reverse items-center gap-2">
                      <p>:تعداد</p>
                      <NumberInput
                        width="80px"
                        defaultValue={1}
                        min={1}
                        max={10}
                        onChange={(e) => setCount(e)}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </div>
                  </div>
                  <div className="w-full flex flex-row-reverse justify-evenly items-center ">
                    <div className="flex flex-row-reverse gap-2">
                      <p>:شناسه</p>
                      <p>{productValues.sku}</p>
                    </div>
                    <div className="flex flex-row-reverse items-center gap-2">
                      <p>:سایز</p>
                      <NumberInput
                        width="80px"
                        defaultValue={30}
                        min={30}
                        max={45}
                        onChange={(e) => setSize(e)}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </div>
                    {/* <div className="flex flex-row-reverse gap-2">
                      <p>:قیمت</p>
                      <div className="flex flex-row-reverse">
                        <p>{priceGroup(productValues.price)}</p>
                        <p>تومان</p>
                      </div>
                    </div> */}
                  </div>
                </div>
              ) : (
                ""
              )}

              {showOptions ? (
                <div
                  style={showOptions ? { opacity: 1 } : { opacity: 0 }}
                  className=" w-[92%] h-48 border border-slate-300 bg-white z-10 rounded-xl overflow-auto duration-300 ease-in-out absolute gap-2 top-36 "
                >
                  {allProducts
                    .filter((e) => e.name.includes(searchValue))
                    .map((item, index) => {
                      return (
                        <>
                          <div
                            className="w-full flex flex-row-reverse items-center h-16 gap-3 font-[vazir] border-b-2 cursor-pointer "
                            onClick={() => handleProductClick(item)}
                          >
                            <img
                              // onClick={() => showImageBigger()}
                              className="h-12 rounded-md "
                              src={item.images[0].src}
                            />
                            {item.name}
                          </div>
                        </>
                      );
                    })}
                </div>
              ) : (
                ""
              )}
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                onClick={submitNewProduct}
                className=" flex items-end w-full font-[vazir] "
              >
                تایید
              </Button>
              {/* <Button variant="ghost">Secondary Action</Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default ProductsBox;
