import React from "react";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Link,
  Snackbar,
  TextField,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Alert from "../../components/Alert";
import { BACKEND_URL } from "../../constants";
import useMainPage from "../../hooks/useMainPage";

const MainPage = () => {
  const {
    urls,
    inputName,
    setInputName,
    inputUrl,
    setInputUrl,
    successAlertOpen,
    setSuccessAlertOpen,
    isCreatingUrl,
    setIsCreatingUrl,
    handleAlertClose,
    deleteUrl,
    createUrl,
  } = useMainPage();

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        {!isCreatingUrl ? (
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "green" }}
            onClick={() => setIsCreatingUrl(true)}
          >
            Create New URL
          </Button>
        ) : (
          <form
            onSubmit={createUrl}
            style={{ display: "flex", alignItems: "baseline" }}
          >
            <TextField
              required
              id="standard-basic"
              label="Name"
              style={{ marginRight: "10px" }}
              onChange={(event) => setInputName(event.target.value)}
              value={inputName}
            />
            <TextField
              required
              id="standard-basic"
              label="URL"
              style={{ marginRight: "10px" }}
              onChange={(event) => setInputUrl(event.target.value)}
              value={inputUrl}
            />

            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "10px" }}
              type="submit"
            >
              Create URL
            </Button>
            <Button variant="contained" onClick={() => setIsCreatingUrl(false)}>
              Cancel
            </Button>
          </form>
        )}
      </div>

      <TableContainer component={Paper} style={{ marginBottom: "100px" }}>
        {urls === null ? (
          <div
            style={{
              padding: "50px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </div>
        ) : !urls.length ? (
          <div
            style={{
              padding: "50px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography>You have no URLs created</Typography>
          </div>
        ) : (
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Index</TableCell>
                <TableCell>URL Name</TableCell>
                <TableCell>Short URL</TableCell>
                <TableCell>Long URL</TableCell>
                <TableCell>Views</TableCell>
                <TableCell>Unique Views</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {urls.map((url, i) => (
                <TableRow key={url.urlCode}>
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell>{url.urlName}</TableCell>
                  <TableCell>
                    <CopyToClipboard
                      text={BACKEND_URL + url.urlCode}
                      onCopy={() => setSuccessAlertOpen(true)}
                    >
                      <Button variant="contained" color="primary">
                        Copy short URL
                      </Button>
                    </CopyToClipboard>
                  </TableCell>
                  <TableCell>
                    <Link href={url.longUrl} target="_blank">
                      Long URL Link
                    </Link>
                  </TableCell>
                  <TableCell>{url.views}</TableCell>
                  <TableCell>{url.uniqueViews}</TableCell>
                  <TableCell>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => deleteUrl(url.urlCode)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <Snackbar
        open={successAlertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert onClose={handleAlertClose} severity="success">
          Link successfully copied
        </Alert>
      </Snackbar>
    </>
  );
};

export default MainPage;
