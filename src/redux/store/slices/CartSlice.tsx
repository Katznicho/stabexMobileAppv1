import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';



export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: {
        //cartList to any and empty initially
        cartList: [] as any[],
        station: {} as any
    },
    reducers: {
        addToCart: (state, action: PayloadAction<any>) => {
            const item = state.cartList.find((item) => item.Id === action.payload.Id);
            if (item) {
                // If item already exists, increase quantity by 1
                item.quantity++;
            } else {
                // If item does not exist, add it to the cart with initial quantity of 1
                state.cartList.push({ ...action.payload, quantity: 1 });
            }
        },

        removeFromCart: (state, action: PayloadAction<any>) => {
            state.cartList = state.cartList.filter((item) => item.Id !== action.payload.Id)
        },
        incrementCartItemQuantity: (state, action: PayloadAction<any>) => {

            const item = state.cartList.find((item) => item.Id === action.payload.Id);
            if (item) {
                item.quantity++;
            }
        },
        decrementCartItemQuantity: (state, action: PayloadAction<any>) => {
            const item = state.cartList.find((item) => item.Id === action.payload.Id);
            if (item) {
                if (item.quantity === 1) return
                item.quantity--;
            }
        },
        storeSelectedStation: (state, action: PayloadAction<any>) => {

            state.station = action.payload
        },
        emptyCart: (state) => {
            state.cartList = []
        }


    }
})

export const {
    addToCart,
    removeFromCart,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    storeSelectedStation,
    emptyCart

} = cartSlice.actions

export default cartSlice.reducer;