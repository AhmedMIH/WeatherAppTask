import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error:', error, info);
  }

  resetError = () => {
    this.setState({hasError: false});
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>
            Something went wrong. please try again
          </Text>
          <Button title="Retry" onPress={this.resetError} />
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 10,
  },
});

export default ErrorBoundary;
