import React, { Component } from "react";
import Product from "../components/Product";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

const productIdQuery = gql`
  query product($id: String!) {
    product(id: $id) {
      id
      name
      gallery
      description
      attributes {
        id
        name
        items {
          value
        }
      }
      prices {
        amount
        currency {
          symbol
        }
      }
    }
  }
`;

class Productpage extends Component {
  render() {
    return (
      <Query
        query={productIdQuery}
        fetchPolicy="network-only"
        variables={{
          id: window.location.href.substring(
            window.location.href.lastIndexOf("/") + 1
          ),
        }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading…</p>;

          return (
            <div>
              <Product data={data} />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Productpage;
