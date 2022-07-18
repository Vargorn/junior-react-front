import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import React, { Component } from 'react';
import Category from '../components/Category';
import { Context } from '../context/Context';

const query = gql`
  query category($input: CategoryInput) {
    category(input: $input) {
      name
      products{
        id
        name
        brand
        inStock
        attributes{
          id
          name
          items{
            value
          } 
        }
        prices{
          currency{
            label
            symbol
          }
          amount
        }
        gallery
      }
    }
  }
`

class CategoryPage extends Component {

  static contextType = Context;

  render() {
    return (
      <Query query={query} variables={{ input: {title:  window.location.href.substring( window.location.origin.length + 1)} }}> 

        {({ data, loading }) => {
          if (loading) return <p>Loading…</p>;
          return (
            <div>
               <Category data={data} />
            </div>
          );
        }}
      </Query>

    );
  }
}

export default CategoryPage;