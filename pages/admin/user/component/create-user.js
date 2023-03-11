import { TextField } from '@mui/material';
import {
  Button,
  Card,
  Grid,
  Modal,
  Row,
  Spacer,
  Switch,
  Text,
} from '@nextui-org/react';
import { Controller } from 'react-hook-form';

const CreateUserModal = ({
  visible,
  closeHandler,
  handler,
  handleSubmit,
  submitHandler,
  control,
  errors,
}) => {
  return (
    <Modal
      blur
      noPadding
      animated
      autoMargin
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Body>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Card
          css={{
            borderColor: 'red',
            borderWidth: 'thin',
          }}
          variant="bordered"
          onPress={handler}
        >
          <Card.Header>
            <Text h2 color={'Red'} css={{ margin: '0 auto' }}>
              New User Information
            </Text>
          </Card.Header>
          <Card.Body>
            
              <Controller
                name="newUserName"
                control={control}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="newUserName"
                    label="Full Name"
                    inputProps={{
                      type: 'text',
                    }}
                    error={Boolean(errors.newUserName)}
                    helperText={
                      errors.newUserName
                        ? errors.newUserName.type === 'minLength'
                          ? 'Full name length is more than 2'
                          : 'Full name is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              />
              <Spacer y={1} />
              <Controller
                name="newUserEmail"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="newUserEmail"
                    label="Email"
                    inputProps={{ type: 'email' }}
                    error={Boolean(errors.newUserEmail)}
                    helperText={
                      errors.newUserEmail
                        ? errors.newUserEmail.type === 'pattern'
                          ? 'Email is not valid'
                          : 'Email is required'
                        : ''
                    }
                    {...field}
                  />
                )}
              />
              <Spacer y={1} />
              <Controller
                name="newUserPassword"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 6,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="newUserPassword"
                    label="Password"
                    inputProps={{
                      type: 'password',
                    }}
                    error={Boolean(errors.newUserPassword)}
                    helperText={
                      errors.newUserPassword
                        ? errors.newUserPassword.type === 'minLength'
                          ? 'Password length is more than 5'
                          : 'Password is required'
                        : ''
                    }
                    {...field}
                  />
                )}
              />
              <Spacer y={1} />
              <Controller
                name="newUserConfirmPassword"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 6,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="newUserConfirmPassword"
                    label="Confirm Password"
                    inputProps={{
                      type: 'password',
                    }}
                    error={Boolean(errors.newUserConfirmPassword)}
                    helperText={
                      errors.newUserConfirmPassword
                        ? errors.newUserConfirmPassword.type === 'minLength'
                          ? 'Confirm Password length is more than 5'
                          : 'Confirm Password is required'
                        : ''
                    }
                    {...field}
                  />
                )}
              />
              <Spacer y={1} />
              <Controller
                name="newUserIsAdmin"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Row align="center" justify="center">
                      <Switch
                        id="newUserIsAdmin"
                        size="xl"
                        css={{
                          color: '$accents9',
                          '& .nextui-c-itiWTf-bDUxer-checked-true': {
                            background: 'rgb(255,0,0,1) !important',
                          },
                        }}
                        checked={value}
                        onChange={(e) => onChange(e.target.checked)}
                      />
                      <Spacer x={0.5} />
                      <Text
                        h4
                        css={{
                          marginTop: '$6',
                          color: '$accents7',
                        }}
                      >
                        isAdmin
                      </Text>
                    </Row>
                  </>
                )}
              />
          </Card.Body>
          <Card.Footer>
            <Grid.Container>
              <Grid lg={12} xs={12} sm={12} md={12} xl={12}>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  size={'lg'}
                  ripple
                  animated
                  type="submit"
                  css={{
                    margin: '0 auto',
                    backgroundColor: 'Red',
                    color: 'White',
                  }}
                >
                  Create
                </Button>
              </Grid>
            </Grid.Container>
          </Card.Footer>
          <Spacer y={1} />
        </Card>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateUserModal;
