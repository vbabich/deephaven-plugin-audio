import React, { useEffect, useState } from "react";
import { useApi } from "@deephaven/jsapi-bootstrap";
import Log from "@deephaven/log";
import { WidgetComponentProps } from "@deephaven/plugin";
import type { Widget } from "@deephaven/jsapi-types";
import useAudioPlayer from "./useAudioPlayer";

const log = Log.module("deephaven-plugin-audio.DeephavenPluginAudioView");

export function DeephavenPluginAudioView(
  props: WidgetComponentProps
): JSX.Element | null {
  const { fetch } = props;
  const [widget, setWidget] = useState<Widget | null>(null);
  const dh = useApi();
  const [audioUrl, setAudioUrl] = useState<string>();
  const play = useAudioPlayer(audioUrl);

  useEffect(() => {
    async function init() {
      // Fetch the widget from the server
      const fetched_widget = (await fetch()) as Widget;
      setWidget(fetched_widget);

      // Add an event listener to the widget to listen for messages from the server
      fetched_widget.addEventListener<Widget>(
        dh.Widget.EVENT_MESSAGE,
        ({ detail }) => {
          // When a message is received, update the text in the component
          const message = detail.getDataAsString();
          let action, payload;
          try {
            ({ action, payload } = JSON.parse(message));
          } catch (e) {
            log.error("Error parsing message", e);
            return;
          }
          log.info("Received message", message, action, payload);
          switch (action) {
            case "init":
              setAudioUrl(payload);
              break;
            case "play":
              play(payload);
              break;
            default:
              log.error("Unknown action", action);
          }
        }
      );
    }

    init();
  }, [dh, fetch]);

  return null;
}

export default DeephavenPluginAudioView;
