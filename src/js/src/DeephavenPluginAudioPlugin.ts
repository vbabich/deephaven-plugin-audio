import { type WidgetPlugin, PluginType } from "@deephaven/plugin";
import { vsGraph } from "@deephaven/icons";
import { DeephavenPluginAudioView } from "./DeephavenPluginAudioView";

// Register the plugin with Deephaven
export const DeephavenPluginAudioPlugin: WidgetPlugin = {
  // The name of the plugin
  name: "deephaven-plugin-audio",
  // The type of plugin - this will generally be WIDGET_PLUGIN
  type: PluginType.WIDGET_PLUGIN,
  // The supported types for the plugin. This should match the value returned by `name`
  // in DeephavenPluginAudioType in deephaven_plugin_audio_type.py
  supportedTypes: "DeephavenPluginAudio",
  // The component to render for the plugin
  component: DeephavenPluginAudioView,
  // The icon to display for the plugin
  icon: vsGraph,
};

export default DeephavenPluginAudioPlugin;
