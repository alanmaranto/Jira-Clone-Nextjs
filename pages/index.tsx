import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import type { NextPage } from "next";
import { Layout } from "../components/layouts";
import EntryList from "../components/ui/EntryList";

const Home: NextPage = () => {
  return (
    <Layout title="Home - OpenJira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px" }}>
            <CardHeader title="Pendientes" />
            {/* Add new entry */}
            <EntryList />
            {/* list all entries */}
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px" }}>
            <CardHeader title="En Progreso" />
            <EntryList />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px" }}>
            <CardHeader title="Contempladas" />
            <EntryList />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
