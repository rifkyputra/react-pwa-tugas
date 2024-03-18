import Meta from '@/components/Meta';

import SymbolBoard from '@/components/SymbolBoard/SymbolBoard';
import TtsBoard from '../../components/TtsBoard/TtsBoard';
import { Box } from '@mui/material';
import NavigationBar from '../../components/NavigationBar/NavigationBar';

function Welcome() {
  return (
    <>
      <Meta title="Welcome" />

      <NavigationBar children={undefined}></NavigationBar>

      <Box flexDirection={'column'}>
        <TtsBoard></TtsBoard>
        <SymbolBoard></SymbolBoard>
      </Box>
    </>
  );
}

export default Welcome;
