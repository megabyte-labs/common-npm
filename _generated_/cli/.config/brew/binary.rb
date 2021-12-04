class CommonShared < Formula
  desc "Includes common files used across different types of common file repositories (e.g. Go, Python, TypeScript, Go, more..)"
  homepage "https://megabyte.space"
  url "https://github.com/ProfessorManhattan/common-shared/releases/download/v0.0.1/common-shared.tar.gz"
  version "0.0.1"
  license "MIT"

  

  def install
    os = OS.kernel_name.downcase
    arch = Hardware::CPU.intel? ? "amd64" : Hardware::CPU.arch.to_s
    bin.install "build/bin/common-shared-#{os}_#{arch}" => "common-shared"
  done

  test do
    system bin/"common-shared", "--version"
  end
end
