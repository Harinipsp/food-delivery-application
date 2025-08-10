import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token,setToken] = useState("");
    const [food_list,setFoodList]  = useState([])
    const addToCart = async (itemId) => {
        console.log("Adding item:", itemId);
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
        }));
        console.log("Cart Items after add:", cartItems);
        if (token) {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
            
        }
    };
    const removeFromCart = async (itemId) => {
        if (!cartItems[itemId]) return; 
    
        try {
            if (token) {
                await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
                    setCartItems((prev) => {
                    const updatedCart = { ...prev };
                    if (updatedCart[itemId] > 1) {
                        updatedCart[itemId] -= 1;
                    } else {
                        delete updatedCart[itemId];
                    }
                    return updatedCart;
                });
    
                console.log("Item removed successfully:", itemId);
            } else {
                console.error("User is not authenticated");
            }
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };
    

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        console.log("Calculating Total:");
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                const itemInfo = food_list.find((product) => product._id === itemId);
                console.log("Item Info:", itemInfo);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[itemId];
                }
            }
        }
        console.log("Total Amount:", totalAmount);
        return totalAmount;
    };
    const fetchFoodList = async () =>{
        try {
            const response = await axios.get(url+"/api/food/list");
            setFoodList(response.data.data || []); 
        } catch (error) {
            console.error("Error fetching food list:", error);
            setFoodList([]); 
        }
    }

    const loadCartData = async (token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData)
    }
useEffect(()=>{
async function loadData() {
    await fetchFoodList();
    if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"))
        
    }
}
loadData();
},[])
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    };
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};
export default StoreContextProvider;
