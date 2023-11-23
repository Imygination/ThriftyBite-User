import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { Button, DataTable, Text } from "react-native-paper";
import * as React from "react";
import { View } from "react-native";
import { addCartFood, minusCartFood, resetCart } from "../store/actions/actionCreators";
import store from "../store";
import utility from "../style/utility,";
import { Axios } from "../helpers/axios";

export default function CartScreen({ route, navigation }) {
  const dispatch = useDispatch();
  // const cart = useSelector(function (state) {
  //   return state.cartReducer.cart;
  // });
  // console.log(cart);
  const detailFood = useSelector(function (state) {
    return state.foodReducer.foodDetail;
  });
  const [cart, setCart] = React.useState([]);

  const [counter, setCounter] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  function addCartHandler(food) {
    console.log(food);
    console.log("Add to Cart...");
    const cartData = {
      foodId: food.foodId,
      name: food.name,
      imageUrl: food.imageUrl,
      count: 1,
      stock: food.stock,
      price: food.price,
      itemPrice: food.price,
      StoreId: food.StoreId
    };
    console.log(cartData);
    dispatch(addCartFood(cartData));
  }

  const minusCartHandler = (food) => {
    console.log("Minus from Cart...");
    const cartData = {
      foodId: food.foodId,
    };
    dispatch(minusCartFood(cartData));
    // console.log(cartData);
  };

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, cart.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  React.useEffect(() => {
    setCart(store.getState().cartReducer.cart);
  }, [counter]);

  React.useEffect(() => {
    setCart(store.getState().cartReducer.cart);
  }, []);

  const total = cart.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price;
  }, 0);

  const submitOrder = async () => {
    try {
      console.log(cart);
      if (cart.length === 0) {
        throw new Error("Order List Empty");
      }
      const token = await AsyncStorage.getItem("access_token");
      const { data } = await Axios({
        method: "post",
        url: "/orders",
        data: cart,
        headers: {
          access_token: token,
        },
      });
      console.log(data);
      console.log("Success Fetch Order...");
      dispatch(resetCart())
      setCounter(counter + 1)
      navigation.navigate('MidtransScreen', { URI: data.redirect_url });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Foods</DataTable.Title>
          <DataTable.Title numeric>Price</DataTable.Title>
          <DataTable.Title numeric>Qty</DataTable.Title>
          <DataTable.Title numeric>Edit</DataTable.Title>
        </DataTable.Header>

        {cart.slice(from, to).map((item) => (
          <DataTable.Row
            style={{
              marginBottom: 20,
              marginTop: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
            key={item.foodId}
          >
            <DataTable.Cell>
              <View style={utility.tableCell}>
                <Text>{item.name}</Text>
              </View>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <View style={utility.tableCell}>
                <Text>Rp. {item.price.toLocaleString({
              style: "currency",
              currency: "IDR",
            })}</Text>
              </View>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <View style={utility.tableCell}>
                <Text>{item.count}</Text>
              </View>
            </DataTable.Cell>
            <DataTable.Cell>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Button
                  onPress={() => {
                    addCartHandler(item);
                    setCounter(counter + 1);
                  }}
                  disabled={item.count >= item.stock ? true : false}
                >
                  +
                </Button>
                <Button
                  onPress={() => {
                    minusCartHandler(item);
                    setCounter(counter - 1);
                  }}
                  style={{ paddingRight: 20 }}
                >
                  -
                </Button>
              </View>
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(cart.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${cart.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={"Rows per page"}
        />
      </DataTable>
      <Text
        variant="titleLarge"
        style={{ textAlign: "center", marginTop: 20, color: "#5db075" }}
      >
        TOTAL CART: Rp. {total.toLocaleString({
              style: "currency",
              currency: "IDR",
            })}
      </Text>
      <Button
        mode="contained"
        onPress={submitOrder}
        buttonColor="#5db075"
        style={{ margin: 50 }}
      >
        Order Now
      </Button>
    </View>
  );
}
