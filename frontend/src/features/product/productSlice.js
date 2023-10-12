import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchProductsByFilters,
  fetchBrands,
  fetchCategories,
  fetchProductById,
  createProduct,
  updateProduct,
  fetchProductsByCategory,
  createComment,
  fetchComments,
  deleteCommentById,
  editComment,
} from "./productApi";

const initialState = {
  products: [],
  comments: [],
  brands: [],
  categories: [],
  status: "idle",
  totalItems: 0,
  selectedProduct: null,
  similarCategory: [],
  totalReview: [],
  totalRating: [],
};
export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductByCategoryAsync = createAsyncThunk(
  "product/fetchProductByCategory",
  async ({ category, id }) => {
    const response = await fetchProductsByCategory(category, id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  "product/fetchProductsByFilters",
  async ({ filter, sort, pagination, searchData, admin }) => {
    const response = await fetchProductsByFilters(
      filter,
      sort,
      pagination,
      searchData,
      admin
    );
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrands",
  async () => {
    const response = await fetchBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories",
  async () => {
    const response = await fetchCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchCommentsAsync = createAsyncThunk(
  "product/fetchComments",
  async (prodId) => {
    const response = await fetchComments(prodId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteCommentByIdAsync = createAsyncThunk(
  "product/DeleteCommentById",
  async (id) => {
    const response = await deleteCommentById(id.prodId, id.reviewId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const editCommentAsync = createAsyncThunk(
  "comment/edit",
  async (comment) => {
    if (comment.comment === "") {
      return;
    }
    const response = await editComment(comment);
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  "product/create",
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const createCommentAsync = createAsyncThunk(
  "comment/create",
  async (comment) => {
    if (comment.comment === "") {
      return;
    }
    console.log("ho gyasgdfasdbfjsdbf sfkj jsh kdf",comment)
    const response = await createComment(comment);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/update",
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductByCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByCategoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.similarCategory = action.payload;
      })
      .addCase(fetchCommentsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCommentsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.comments = action.payload.reviews;
        state.totalReview = action.payload.numOfReviews;
        state.totalRating = action.payload.ratings;
      })
      .addCase(deleteCommentByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCommentByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.comments = action.payload.reviews;
        state.totalReview = action.payload.numOfReviews;
        state.totalRating = action.payload.ratings;
      })
      .addCase(editCommentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editCommentAsync.fulfilled, (state, action) => {
        state.status = "idle";
        if(!action.payload){
          return;
        }
        state.comments=state.comments.filter((rev)=>{
          if(rev.user.toString() !== action.payload.reviews.user.toString()){
            return rev;
          }
        })
        // state.comments = [...arr,action.payload.reviews];
        state.comments.push(action.payload.reviews);
        console.log("hdsbdsbhj",state.comments)
        state.totalReview = action.payload.numOfReviews;
        state.totalRating = action.payload.ratings;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(createCommentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCommentAsync.fulfilled, (state, action) => {
        state.status = "idle";
        if(!action.payload){
          return;
        }
        state.comments = action.payload.reviews;
        state.totalReview = action.payload.numOfReviews;
        state.totalRating = action.payload.ratings;
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
        state.selectedProduct = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectAllComments = (state) => state.product.comments;
export const allCommentsRatings = (state) => state.product.totalRating;
export const allCommentsNumber = (state) => state.product.totalReview;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectProductListStatus = (state) => state.product.status;
export const selectProductByCategory = (state) => state.product.similarCategory;
export const selectTotalItems = (state) => state.product.totalItems;

export default productSlice.reducer;
