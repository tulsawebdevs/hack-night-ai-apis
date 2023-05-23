{ pkgs }: {
    deps = [
        pkgs.yarn
        pkgs.esbuild
        pkgs.nodejs-18_16_0

        pkgs.nodePackages.typescript
        pkgs.nodePackages.typescript-language-server
    ];
}
