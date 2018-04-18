import React from 'react';
import cn from 'classnames';
import { Button } from 'plugin-api/beta/client/components/ui';
import styles from './ChangeEmail.css';

class ChangeEmail extends React.Component {
  state = { editing: false };

  toggleEditing = () => {
    this.setState(({ editing }) => ({
      editing: !editing,
    }));
  };

  static On = ({ editing, children }) => (editing ? children : null);
  static Off = ({ editing, children }) => (editing ? null : children);

  static Content = ({ children }) => (
    <div className={styles.content}>
      <h3>{children}</h3>
    </div>
  );

  static Actions = ({ children }) => (
    <div className={styles.actions}>{children}</div>
  );

  static EditButton = ({ children, toggleEditing }) => (
    <Button className={styles.button} onClick={toggleEditing}>
      {children}
    </Button>
  );

  render() {
    return (
      <div
        className={cn(styles.container, {
          [styles.editing]: this.state.editing,
        })}
      >
        {React.Children.map(this.props.children, child =>
          React.cloneElement(child, {
            toggleEditing: this.toggleEditing,
            editing: this.state.editing,
          })
        )}
      </div>
    );
  }
}

class Usage extends React.Component {
  render() {
    return (
      <ChangeEmail>
        <ChangeEmail.Content>Content</ChangeEmail.Content>
        <ChangeEmail.Off>Off</ChangeEmail.Off>
        <ChangeEmail.EditButton>Edit</ChangeEmail.EditButton>
      </ChangeEmail>
    );
  }
}

export default Usage;
