import React from 'react';

const connectContext =
(ContextProvider, mapContextToProps) =>
  (Component) => {
    const wrappedComponent = props => (
      <ContextProvider.Consumer>
        {context => (
          <Component
            {...mapContextToProps(context)}
            {...props}
          />
          )
        }
      </ContextProvider.Consumer>
    );
    return wrappedComponent;
  };

export default connectContext;
