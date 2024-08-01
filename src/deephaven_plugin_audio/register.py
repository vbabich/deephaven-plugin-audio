from deephaven.plugin import Registration, Callback
from deephaven.plugin.utilities import create_js_plugin, DheSafeCallbackWrapper

from .js_plugin import DeephavenPluginAudioJsPlugin
from .deephaven_plugin_audio_type import DeephavenPluginAudioType

# The namespace that the Python plugin will be registered under.
PACKAGE_NAMESPACE = "deephaven_plugin_audio"
# Where the Javascript plugin is. This is set in setup.py.
JS_NAME = "_js"
# The JsPlugin class that will be created and registered.
PLUGIN_CLASS = DeephavenPluginAudioJsPlugin


class DeephavenPluginAudioRegistration(Registration):
    @classmethod
    def register_into(cls, callback: Callback) -> None:

        # Register the Python plugin
        callback.register(DeephavenPluginAudioType)

        # The JavaScript plugin requires a special registration process, which is handled here
        js_plugin = create_js_plugin(
            PACKAGE_NAMESPACE,
            JS_NAME,
            PLUGIN_CLASS,
        )

        callback.register(js_plugin)
