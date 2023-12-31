import typing

from modulegraph.modulegraph import ModuleGraph

from .. import build_app
from ._types import RecipeInfo


def check(cmd: "build_app.py2app", mf: ModuleGraph) -> typing.Optional[RecipeInfo]:
    # wx.lib.pubsub tries to be too smart w.r.t.
    # the __path__ it uses, include all of it when
    # found.
    m = mf.findNode("wx.lib.pubsub")
    if m is None or m.filename is None:
        return None

    include_packages = [
        "wx.lib.pubsub.*",
        "wx.lib.pubsub.core.*",
        "wx.lib.pubsub.core.arg1.*",
        "wx.lib.pubsub.core.kwargs.*",
        "wx.lib.pubsub.pubsub1.*",
        "wx.lib.pubsub.pubsub2.*",
        "wx.lib.pubsub.utils.*",
    ]
    return {"includes": include_packages}
