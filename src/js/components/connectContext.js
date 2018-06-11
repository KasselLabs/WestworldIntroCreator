import React from 'react';

const connectContext =
(ContextProvider, mapContextToProps) =>
  (Component) => {
    return class WrappedContextComponent extends React.Component {
      render() {
        return (
          <ContextProvider.Consumer>
            {context => (
              <Component
                {...mapContextToProps(context)}
                {...this.props}
              />
              )
            }
          </ContextProvider.Consumer>
        );
      }
    };
  };

export default connectContext;
