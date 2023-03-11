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

const EditUserModal = ({
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
      css={{
        backgrounColor: 'green',
        '.nextui-c-dTfjaK-flgyXy-blur-false': {
          background: '$accents4 !important',
        },
        '.nextui-c-dTfjaK': {
          background: 'green !important',
        },
        '.nextui-backdrop-layer': {
          background: 'transparent !important',
        },
      }}
    >
      <Modal.Body>
        <Card
          css={{
            borderColor: 'red',
            borderWidth: 'thin',
            paddingLeft: '2%',
            paddingRight: '2%',
          }}
          variant="bordered"
          onPress={handler}
        >
          <form onSubmit={handleSubmit(submitHandler)}>
            <Card.Header>
              <Text h2 color={'Red'} css={{ margin: '0 auto' }}>
                Edit User Information
              </Text>
            </Card.Header>
            <Card.Body>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    disabled
                    fullWidth
                    id="name"
                    label="Full Name"
                    inputProps={{
                      type: 'text',
                      readOnly: true,
                    }}
                    error={Boolean(errors.name)}
                    helperText={
                      errors.name
                        ? errors.name.type === 'minLength'
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
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    disabled
                    id="email"
                    label="Email"
                    inputProps={{
                      type: 'email',
                      readOnly: true,
                    }}
                    error={Boolean(errors.email)}
                    helperText={
                      errors.email
                        ? errors.email.type === 'pattern'
                          ? 'Email is not valid'
                          : 'Email is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              />
              <Spacer y={1} />

              <Controller
                name="isAdmin"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Row align="center" justify="center">
                      <Switch
                        id="isAdmin"
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
                    Update
                  </Button>
                </Grid>
              </Grid.Container>
            </Card.Footer>
            <Spacer y={1} />
          </form>
        </Card>
      </Modal.Body>
    </Modal>
  );
};

export default EditUserModal;
