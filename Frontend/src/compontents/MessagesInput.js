import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import Textarea from "@mui/joy/Textarea";
import { IconButton, Stack } from "@mui/joy";

import FormatBoldRoundedIcon from "@mui/icons-material/FormatBoldRounded";
import FormatItalicRoundedIcon from "@mui/icons-material/FormatItalicRounded";
import StrikethroughSRoundedIcon from "@mui/icons-material/StrikethroughSRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

export default function MessageInput(props) {
  const { textAreaValue, setTextAreaValue, onSubmit } = props;
  const textAreaRef = React.useRef(null);
  const handleClick = () => {
    if (textAreaValue.trim() !== "") {
      onSubmit();
      setTextAreaValue("");
    }
  };
  return (
    <Box sx={{ px: 2, pb: 3 }}>
      <FormControl>
        <Textarea
          placeholder="Type something here…"
          aria-label="Message"
          ref={textAreaRef}
          onChange={(e) => {
            setTextAreaValue(e.target.value);
          }}
          value={textAreaValue}
          minRows={3}
          maxRows={10}
          endDecorator={
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              flexGrow={1}
              sx={{
                py: 1,
                pr: 1,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <div>
                <IconButton size="sm" variant="plain" color="neutral">
                  <FormatBoldRoundedIcon />
                </IconButton>
                <IconButton size="sm" variant="plain" color="neutral">
                  <FormatItalicRoundedIcon />
                </IconButton>
                <IconButton size="sm" variant="plain" color="neutral">
                  <StrikethroughSRoundedIcon />
                </IconButton>
                <IconButton size="sm" variant="plain" color="neutral">
                  <FormatListBulletedRoundedIcon />
                </IconButton>
                {/* <IconButton size="sm" variant="plain" color="neutral">
                  <InputEmoji
                    onChange={(e) => {
                      setTextAreaValue(e.target.value);
                    }}
                    value={textAreaValue}
                  />
                </IconButton> */}
              </div>
              <Button
                size="md"
                sx={{
                  alignSelf: "center",
                  borderRadius: "lg",
                  py: 1,
                  backgroundColor: "#d0242e",
                  "&:hover": {
                    backgroundColor: "#981c24",
                  },
                }}
                endDecorator={<SendRoundedIcon />}
                onClick={handleClick}
              >
                Send
              </Button>
            </Stack>
          }
          onKeyDown={(event) => {
            if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
              handleClick();
            }
          }}
          sx={{
            "& textarea:first-of-type": {
              minHeight: 72,
            },
          }}
        />
      </FormControl>
    </Box>
  );
}
