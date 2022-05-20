export const GET_CATEGORIES = `
{
  categories{
    name
    products{
      id
      name
      brand
      inStock
      gallery
      prices{
        currency{
          label
          symbol
        }
        amount
      }
    }
  }
}
`;
export const ALL_PRODUCTS = `{
  category(input: {title: "all"}){
    products{
      id
      name
      brand
      inStock
      gallery
      prices{
        currency{
          label
          symbol
        }
        amount
      }
      description
    }
  }
}`;
export const GET_CURRENCIES_QUERY = `
{
  currencies {
    label
    symbol
  }
}
`;
