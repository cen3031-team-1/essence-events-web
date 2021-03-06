import React from 'react';
import Button from '@material-ui/core/Button/index';
import Dialog from '@material-ui/core/Dialog/index';
import DialogActions from '@material-ui/core/DialogActions/index';
import DialogContent from '@material-ui/core/DialogContent/index';
import DialogContentText from '@material-ui/core/DialogContentText/index';

import { Typography } from '@material-ui/core';

export default class CartDialog extends React.Component {


  componentDidUpdate() {
    console.log(this.props.price);
  }

  render() {
    return (
      <div>
        <Dialog
          open={true}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            {this.props.error ? <Typography variant='h6' color='error'>Your input is invalid.</Typography> : null}
            <DialogContentText>
              {this.props.message}
            </DialogContentText>

            {this.props.cart ? this.props.cart.map((e, i) =>
              <Typography key={i}>
                {e.title} - ${Math.round(e.price * 100) / 100}
              </Typography>) : null}

            <Typography><b>Total: ${this.props.price}</b></Typography>

          </DialogContent>
          <DialogActions>
            <Button onClick={() => {this.props.handleCancel()}} color="primary">
              Cancel
            </Button>

            <Button onClick={() => this.props.handleSave(this.state)} color="primary">
              Check Out
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}