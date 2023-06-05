import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Markdown from '/modules/components/Markdown';
import Typography from '/modules/components/Typography';
import AppAppBar from '/modules/views/AppAppBar';
import AppFooter from '/modules/views/AppFooter';
import withRoot from '/modules/withRoot';

import { MDXRemote } from '@mdx-js/react';
import { serialize } from 'next-mdx-remote/serialize';
import fs from 'fs';
import path from 'path';
//import terms from '/modules/views/terms.md';

function Terms({ mdxContent }) {
  return (
    <React.Fragment>
      <AppAppBar />
      <Container>
        <Box sx={{ mt: 7, mb: 12 }}>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Terms
          </Typography>
          <Markdown>{mdxContent}</Markdown>
        </Box>
      </Container>
      <AppFooter />
    </React.Fragment>
  );
}

export async function getStaticProps() {
  const mdxSource = fs.readFileSync(path.join(process.cwd(), '/modules/views/terms.md'));
  const mdxContent = await serialize(mdxSource);

  return {
    props: {
      mdxContent,
    },
  };
}

export default withRoot(Terms);
